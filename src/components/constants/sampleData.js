export const samplechats= [
    {
    avatar:["https://www.w3school.com/howto/img_avatar.png"],
    name:"John Doe",
    _id:"1",
    groupChat:false,
    members:["1","2"],
},
{
    avatar:["https://www.w3school.com/howto/img_avatar.png"],
    name:"John boi",
    _id:"2",
    groupChat:true,
    members:["1","2"],
},
];

export const sampleusers=[
    {
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
    name:"John Doe",
    _id:"1",
    },
    {
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        name:"John boi",
        _id:"2",
    },
]

export const samplenotifications=[
    {
        sender:{
         avatar:["https://www.w3school.com/howto/img_avatar.png"],
         name:"John Doe",
        },
     _id:"1",
     },
     {
         sender:{
         avatar:["https://www.w3school.com/howto/img_avatar.png"],
         name:"John boi",
         },
         _id:"2",
     },
];

export const sampleMessage=[
    {
attachments:[],
content:" kuch bhi nahi",
_id:"ufbhbbg",
sender:{
    _id:"user._id",
    name:"tani",
},
chat:"chatId",
createdAt:"2024-05-30",
    },

    {
        attachments:[
        {
            public_id:"hsuas2",
            url:"https://www.w3school.com/howto/img_avatar.png",
        },
        ],
        content:" ",
        _id:"ufbhbbg2544",
        sender:{
            _id:"hahah",
            name:"tani2",
        },
        chat:"chatId",
        createdAt:"2024-05-30",
            },
];


export const DashboardData={
 user:[
    {
        name:"tanisha",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        _id:"1",
        username:"tanishaa",
        friends:30,
        groups:5,
    },
    {
        name:"gungun",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        _id:"2",
        username:"gun_gun",
        friends:25,
        groups:15,
    },
 ],

 chats:[
    {
        name:"acha group",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        _id:"1",
        groupChat:false,
        members:[
            {_id:"1",avatar:"https://www.w3school.com/howto/img_avatar.png"},
            {_id:"2",avatar:"https://www.w3school.com/howto/img_avatar.png"},
        ],
        totalMembers: 2,
        totalMessages :20,
        creator:{
        name:"gungun",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        },
    },
    {
        name:"bura group",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        _id:"2",
        groupChat:false,
        members:[
            {_id:"1",avatar:"https://www.w3school.com/howto/img_avatar.png"},
            {_id:"2",avatar:"https://www.w3school.com/howto/img_avatar.png"},
        ],
        totalMembers:2,
        totalMessages:20,
        creator:{
        name:"tanisha",
        avatar:["https://www.w3school.com/howto/img_avatar.png"],
        },
    },
 ],

 messages:[
        {
            attachments:[],
            content:" kuch bhi nahi",
            _id:"one",
            sender:{
                avatar:"https://www.w3school.com/howto/img_avatar.png",
                name:"tani",
            },
            chat:"chatId",
            groupChat:false,
            createdAt:"2024-05-30",
      },

       {
                    attachments:[
                    {
                        public_id:"hsuas2",
                        url:"https://www.w3school.com/howto/img_avatar.png",
                    },
                    ],
                    content:" radheee ",
                    _id:"two",
                    sender:{
                        avatar:"https://www.w3school.com/howto/img_avatar.png",
                        name:"tani2",
                    },
                    chat:"chatId2",
                    groupChat:true,
                    createdAt:"2024-05-30",
                        },
 ],
};


  