import { gql } from "urql";

export const GET_BALLOONS = gql`
  query ($filter: FilterInput, $sort: SortInput, $after: ID, $before: ID) {
    balloons(filter: $filter, sort: $sort, after: $after, before: $before) {
      edges {
        node {
          id
          name
          description
          imageUrl
          price
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_BALLOON_BY_ID = gql`
  query ($id: String!) {
    balloon(id: $id) {
      id
      name
      description
      imageUrl
      price
      variant
      color
      availableSince
    }
  }
`;

export const GET_BALLOON_BY_TYPE = gql`
  query ($type: Variant!) {
    balloons(filter: { variant: $type }) {
      edges {
        node {
          id
          name
          imageUrl
        }
      }
    }
  }
`;
