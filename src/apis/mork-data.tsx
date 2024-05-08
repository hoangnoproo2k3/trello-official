
export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Hoangnv MERN Stack Board',
    description: 'Pro MERN stack Course',
    type: 'public', // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03'], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            tagsData: [
              { id: 1, color: '#0AAAF4' },
              { id: 2, color: '#F8BD1C' },
            ],
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Markdown Syntax ',
            cover: '/images/exam-trello.png',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            like: ['test like 01', 'test like 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          {
            _id: 'card-id-02', boardId: 'board-id-01', tagsData: [{ id: 1, color: '#0AAAF4' }, { id: 2, color: '#F8BD1C' },], columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: []
          },
          { _id: 'card-id-03', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-04', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-05', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-06', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-07', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          { _id: 'card-id-08', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-02', title: 'Title of card 08', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-09', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-02', title: 'Title of card 09', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-10', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-02', title: 'Title of card 10', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          { _id: 'card-id-11', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-03', title: 'Title of card 11', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-12', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-03', title: 'Title of card 12', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] },
          { _id: 'card-id-13', boardId: 'board-id-01', tagsData: [], columnId: 'column-id-03', title: 'Title of card 13', description: null, cover: null, memberIds: [], like: [], comments: [], attachments: [] }
        ]
      }
    ]
  }
}
// data cũ
const boardsData: any = [
  {
    id: '1',
    name_board: 'Design',
    cards: [
      {
        src_img: '/images/exam-trello.png',
        tagsData: [
          { id: 1, color: '#0AAAF4' },
          { id: 2, color: '#F8BD1C' },
        ],
        title_card: 'Unmatched toner cartridge quality 20 less than oem price',
        description: `Why read motivational sayings? For motivation!
                You might need a bit, if you can use last year’s list 
                of goals this year because it’s as good as new.`,
        list_user: '',
        total_message: '76',
        total_care: '43',
        total_contribute: '12'
      },
      {
        src_img: '/images/exam-trello.png',
        tagsData: [
          { id: 1, color: '#0AAAF4' },
          { id: 2, color: '#F8BD1C' },
        ],
        title_card: 'Unmatched toner cartridge quality 20 less than oem price',
        description: `Why read motivational sayings? For motivation!
                You might need a bit, if you can use last year’s list 
                of goals this year because it’s as good as new.`,
        list_user: '',
        total_message: '76',
        total_care: '43',
        total_contribute: '12'
      },
      {
        src_img: '',
        tagsData: [
          { id: 1, color: '#0AAAF4' },
          { id: 2, color: '#F8BD1C' },
          { id: 3, color: '#891BE8' },
        ],
        title_card: 'Unmatched toner cartridge quality 20 less than oem price',
        description: `Why read motivational sayings? For motivation!
                You might need a bit, if you can use last year’s list 
                of goals this year because it’s as good as new.`,
        list_user: '',
        total_message: '10',
        total_care: '2',
        total_contribute: '1'
      }
    ]
  },
  {
    id: '2',
    name_board: 'Prototip',
    cards: [
      {
        src_img: '',
        tagsData: [
          { id: 1, color: '#E33233' },
          { id: 2, color: '#F8BD1C' },
        ],
        title_card: 'Unmatched toner cartridge quality 20 less than oem price',
        description: `Why read motivational sayings? For motivation!
                You might need a bit, if you can use last year’s list 
                of goals this year because it’s as good as new.`,
        list_user: '',
        total_message: '1111',
        total_care: '222',
        total_contribute: '33'
      }
    ]
  },
  {
    id: '3',
    name_board: 'Final',
    cards: [
      {
        src_img: '/images/exam-trello.png',
        tagsData: [
          { id: 1, color: '#0AAAF4' },
          { id: 2, color: '#F8BD1C' },
        ],
        title_card: 'Unmatched toner cartridge quality 20 less than oem price',
        description: `Why read motivational sayings? For motivation!
                You might need a bit, if you can use last year’s list 
                of goals this year because it’s as good as new.`,
        list_user: '',
        total_message: '12',
        total_care: '32',
        total_contribute: '1'
      }
    ]
  },
];