import React, { Component } from 'react';
import {
  Text,
  View,
  Checkbox,
} from 'react-native';
import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
import PostItem from '../Post/Post'
import get from 'lodash.get'

class SubReddit extends React.Component {
  render() {
    // Expects a `list` with a string `title`, as well as the information
    // for the `<PostItem>`s (we'll get that next).
    const edges = get(this.props.subreddit, 'posts.edges');
    return (
      <View>
        {/* It works just like a React component, because it is one! */}
        <Text>Sub Reddit</Text>
        <Text>{subreddit.name}</Text>
        {edges.map(edge => <PostItem item={edge.node} />)}
      </View>
    );
  }
}

export default createFragmentContainer(
  SubReddit,
  // This `_posts` fragment name suffix corresponds to the prop named `list` that
  // is expected to be populated with server data by the `<SubReddit>` component.
  graphql`
    fragment SubReddit_subreddit on SubReddit {
      # Specify any fields required by '<SubReddit>' itself.
      name,
      # Include a reference to the fragment from the child component.
      posts {
        edges {
          node {
            ...Post_item
          }
        }
      }
    }
  `,
);