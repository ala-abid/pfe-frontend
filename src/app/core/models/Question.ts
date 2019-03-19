export interface Question {
  id: string;
  title: string;
  txt: string;
  // TODO add tags
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    desc: string;
  };
  upVotes: number;
  downVotes: number;
  isSolved: boolean;
  answers: [
    {
      id: string;
      txt: string;
      author: {
        username: string;
        desc: string;
      }
      replies: [
        {
          id: string;
          txt: string;
          author: {
            username: string;
            desc: string;
          }
        }
      ]
    }
  ];
}
