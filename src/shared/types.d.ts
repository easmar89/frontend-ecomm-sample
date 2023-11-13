type Balloon = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  variant?: string;
  color?: string;
  availableSince?: string;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

type BalloonEdge = {
  node: Balloon;
  cursor: string;
};

type BalloonData = {
  balloons: {
    edges: BalloonEdge[];
    pageInfo: PageInfo;
  };
};

type CartItemType = {
  id: string;
  quantity: number;
  price: number;
};

type FilterType = {
  variant: string | null;
  color: string | null;
  sort: string | null;
  after: string | null;
  before: string | null;
};
