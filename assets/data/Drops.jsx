export default [
    {
        id: 1, 
        primaryImage: "1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i",
        images: ["1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i"],
        caption: "Came here for thanksgiving dinner. The food was so delicious I almost cried. The service was also amazing. I will definitely be coming back.",
        likeCount: 10,
        likedUsers : new Set([1, 2]),
        count: 1,
        usedID: 1,
        location: "Abe & Louie's, Boylston Street, Boston, MA, USA"
    },
    {
        id: 2,
        primaryImage: "1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU",
        caption: "Make sure to try the chicken breast. Promise you won't regret it.",
        images: ["1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU"],
        likeCount: 90,
        likedUsers : new Set([1,2,3,4,5]),
        count: 1,
        usedID: 2,
        location: "Slice of Italy, Belcourt Avenue, Nashville, TN, USA"
    },
    {
        id:3,
        primaryImage: "1Sy_207ehPeDsy4SOTJ6KJMhaudUjOgWD",
        caption: "The view is amazing. I would recommend this trail to anyone who loves hiking.",
        images: ["1Sy_207ehPeDsy4SOTJ6KJMhaudUjOgWD"],
        likedUsers : new Set([3,4,5,6]),
        likeCount: 9,
        count: 1,
        usedID: 3,
        location: "Sugarloaf Mountain, Maryland, USA"
    },
    {
        id: 4, 
        primaryImage: "1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb",
        caption: "Almost died on this trail. But the view was worth it.",
        images: ["1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb"],
        likedUsers : new Set([6,5,4,8,6]),
        likeCount: 23,
        count: 1,
        usedID: 4,
        location: "Rancheria Falls National Trail, Lakeshore, CA, USA"
    },
    {
        id: 5,
        primaryImage: "1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU",
        caption: "The best Italian food I've ever had. The pasta was cooked to perfection.",
        images: ["1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU"],
        likeCount: 16,
        likedUsers : new Set([4,2,6,7,8]),
        count: 1,
        usedID: 4,
        location: "Slice of Italy, Belcourt Avenue, Nashville, TN, USA"
    },
    {
        id: 6, 
        primaryImage: "1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i",
        caption: "The best food I've ever had. The service was also amazing. I will definitely be coming back.",
        images: ["1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i"],
        likeCount: 10,
        likedUsers : new Set([1, 2, 3, 4, 5]),
        count: 1,
        usedID: 3,
        location: "Abe & Louie's, Boylston Street, Boston, MA, USA"
    },
    {
        id: 7, 
        primaryImage: "1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb",
        caption:"Too many times I thought I was going to die. But the view was worth it.",
        images: ["1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb"],
        count: 1,
        likedUsers : new Set([1, 2, 3, 4, 5, 6, 7, 8]),
        likeCount: 40,
        usedID: 2,
        location: "Rancheria Falls National Trail, Lakeshore, CA, USA"
    },
    {
        id: 8,
        primaryImage: "1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU",
        caption: "I miss this food when I am not in Cali. The pasta was cooked to perfection",
        secondaryImage: "1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i",
        images: ["1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU", "1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i"],
        likedUsers : new Set([4,2,7,9,5]),
        count: 2,
        likeCount: 5,
        usedID: 1,
        location: "Slice of Italy, Belcourt Avenue, Nashville, TN, USA"
    },
    {
        id:9,
        primaryImage: "1Sy_207ehPeDsy4SOTJ6KJMhaudUjOgWD",
        caption: "The view is amazing. I would recommend this trail to anyone who loves hiking.",
        secondaryImage: "1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb",
        images: ["1Sy_207ehPeDsy4SOTJ6KJMhaudUjOgWD", "1nYhqGTh2kowSSJM82cuDzLVdKfe6juxb"],
        likedUsers : new Set([3,4,5,6,7,8,9]),
        likeCount: 3,
        count: 2,
        usedID: 2,
        location: "Sugarloaf Mountain, Maryland, USA"
    },
    {
        id: 10, 
        primaryImage: "1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i",
        caption: "The best food I've ever had. I am going back next week.",
        secondaryImage: "1Xamo20kb1mtd16NDxPjk-l6hwii7rQCU",
        likeCount: 10,
        likedUsers: new Set([4,5,7,8,9]),
        images: ["1r7-JTef8koBL0Oef8ZxByzHQj4SAI0-i"],
        count: 1,
        usedID: 4,
        location: "Abe & Louie's, Boylston Street, Bosto"
    }
]