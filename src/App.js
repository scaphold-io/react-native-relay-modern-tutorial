import React, { Component } from 'react';
import {
  Text,
  View,
  Checkbox,
} from 'react-native';
import {
  graphql,
  QueryRenderer,
} from 'react-relay'
import environment from '../relay-environment'
import SubReddit from './containers/SubReddit/SubReddit'
import get from 'lodash.get'

export default class App extends React.Component {
  render() {
    // Expects a `list` with a string `title`, as well as the information
    // for the `<PostItem>`s (we'll get that next).
    const edges = get(this.props.page, 'viewer.allSubReddits.edges');
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            # Include a reference to the fragment from the child component.
            viewer {
              allSubReddits {
                edges {
                  node {
                    ...SubReddit_subreddit
                  }
                }
              }
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            return <Text>{error.message}</Text>;
          } else if (props) {
            const subreddits = get(props, 'viewer.allSubReddits.edges', [])
            if (!subreddits.length) {
              return <Text>No SubReddits</Text>
            }
            const edge = subreddits[0]
            return (
              <View>
                {/* It works just like a React component, because it is one! */}
                <Text>App</Text>
                <SubReddit subreddit={edge.node} />
              </View>
            )
          }
          return <Text>Loading</Text>;
        }}
      />
    );
  }
}
