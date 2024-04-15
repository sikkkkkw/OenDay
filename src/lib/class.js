class MyClass{
    title;
    price;
    genre;

    constructor(title,price,genre){
        this.title = title;
        this.price = price;
        this.genre = genre;
    }

    static FromJson(react_query){
        const user = JSON.parse(react_query);
        this.title = user.title; 
    }
}

const user = MyClass.FromJson();
