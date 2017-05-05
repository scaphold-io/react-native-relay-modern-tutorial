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

class Post extends React.Component {
  render() {
    // Expects the `item` prop to have the following shape:
    // {
    //   item: {
    //     title,
    //   }
    // }
    const item = this.props.item;
    return (
      <View>
        <Text>Post</Text>
        <Text>{item.title}</Text>
        <Text>{item.url}</Text>
      </View>
    );
  }
}

/**
 * export default createFragmentContainer(Post, {
 *   item: graphql`
 *     fragment Post_item on Post {
 *       title
 *     }
 *   `
 * })
 */

/**
 * This above form is familiar to the class container API.
 * The modern API allows you to pass the `graphql` template literal
 * diretly as the second argument. Relay will infer the prop name
 * from the fragment name according to the naming convention
 * `<FileName>_<propName>.
 *
 * The export below is equivalent to the one above.
 */

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_item on Post {
      title
      url
    }
  `,
);

