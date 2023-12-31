import { v4 as uuidv4 } from "uuid";


class Item{
    private readonly _id: string;
    public get id(): string {
        return this._id;
    }
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _price: number;
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    private _description: string;
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }


    constructor(id:string=uuidv4(),name:string,price:number,description:string){
        this._id = id
        this._name = name;
        this._price = price;
        this._description = description
    }

    ItemHTMLElement():HTMLDivElement{
        const ItemDisplay = document.createElement('div')
        ItemDisplay.classList.add('row')
        ItemDisplay.innerHTML = `<strong>${this._name}</strong><p>$${this._price} ${this._description}<p><button class = 'add-one' id = 'a1${this._id}'>Add One</button>`
        return ItemDisplay
    }
}

class User{
    private readonly _id: string;
    public get id(): string {
        return this._id;
    }
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _age: number;
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    private _cart: Item[];
    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }


    constructor(id:string=uuidv4(),name:string,age:number,cart:Item[]){
        this._id = id
        this._name = name;
        this._age = age;
        this._cart = cart
    }

    addToCart(item:Item):void{
        this._cart.push(item)
    }

    removeFromCart(item:Item):void{
        this._cart = this._cart.filter((i)=>item.id !== i.id)
    }

    removeQuantityFromCart(item:Item,quantity:number){
        let count = this._cart.filter((i)=>item.id == i.id).length
        this.removeFromCart(item)
        for (let i = count-quantity; i > 0; i-- ){
            this.addToCart(item)
        }
    }

    cartTotal():number{

        return this._cart.length?this._cart.map((x)=>(x.price)).reduce((x,y)=>(x+y)):0
    }

    printCart():void{
        for(let item of this._cart){
            console.log(item.name)
        }
    }

    CartHTMLElement():HTMLDivElement{
        let prices: any = {}
        let ids: any = {}
        let counts: any = {}
        for (let item of this._cart){
            if (counts.hasOwnProperty(item.name)){
                counts[item.name]++
            }else{
                counts[item.name] = 1
                ids[item.name] = item.id
                prices[item.name] = item.price
            }
        }
        const CartView = document.createElement('div')
        let s = 'Your Cart:'
        for (const k in counts){
            s += `<div class = 'row'><strong>${k}:</strong><p> $${prices[k]} Qty:${counts[k]} <p><button class = 'remove-one' id = 'r1${ids[k]}'>Remove One</button><button class = 'remove-all' id = 'ra${ids[k]}'>Remove All</button></div>`
        }
        s += `<div class = 'row justify-content-center'><strong>Total:</strong> $${this.cartTotal()}</div>`
        CartView.innerHTML = s
        return CartView
    }

    static loginUser(name:string, age:number){
        const newUser = new User(uuidv4(),name,age,[])
        return newUser
    }
}



class Shop{
    public static myUser:User|null

    static loginUser(event:Event){
        event.preventDefault()
        new Shop()
        const name = (<HTMLInputElement>document.getElementById('username')).value
        const age = parseInt((<HTMLInputElement>document.getElementById('userage')).value)
        Shop.myUser = User.loginUser(name,age)
        const LoginPage = document.getElementById('login')
        LoginPage?.classList.replace('is-visible','is-invisible')
        const ShopArea = document.getElementById('shoparea')
        const CartArea = document.getElementById('cartarea')
        ShopArea?.classList.replace('is-invisible','is-visible')
        CartArea?.classList.replace('is-invisible','is-visible')
    }

    ShowItems(){
        const ShopArea = document.getElementById('shoparea')
        for (let item of this._stock){
            const itemRow = item.ItemHTMLElement()
            ShopArea?.appendChild(itemRow)
            const AddButton = document.getElementById(`a1${item.id}`)
            AddButton?.addEventListener('click',(_)=>{
                Shop.myUser?.addToCart(item)
                this.UpdateCart()
            })
        }
    }

    UpdateCart(){
        const CartArea = document.getElementById('cartarea')
        const EmptyMessage = document.createElement('div')
        EmptyMessage.innerHTML = 'Your cart is empty'
        CartArea!.innerHTML=''
        Shop.myUser?.CartHTMLElement()?CartArea?.appendChild(Shop.myUser?.CartHTMLElement()):CartArea?.appendChild(EmptyMessage)
        const RemoveOnes = document.getElementsByClassName('remove-one')
        for (let i = 0; i < RemoveOnes.length; i ++){
            RemoveOnes[i].addEventListener('click',(_)=>{
                const toRemove = Shop.myUser!.cart.filter((it)=>it.id==RemoveOnes[i].id.slice(2))[0]
                Shop.myUser!.removeQuantityFromCart(toRemove,1)
                this.UpdateCart()
            })
        }
        const RemoveAlls = document.getElementsByClassName('remove-all')
        for (let i = 0; i < RemoveAlls.length; i ++){
            RemoveAlls[i].addEventListener('click',(_)=>{
                const toRemove = Shop.myUser!.cart.filter((it)=>it.id==RemoveOnes[i].id.slice(2))[0]
                Shop.myUser!.removeFromCart(toRemove)
                this.UpdateCart()
            })
        }
    }

    private _stock: Item[];
    public get stock(): Item[] {
        return this._stock;
    }
    public set stock(value: Item[]) {
        this._stock = value;
    }
    constructor(){
        let itemA=new Item(uuidv4(),'lollipop',4,'licky licky')
        let itemB =new Item(uuidv4(),'laffy taffy',2,'sticky icky')
        let itemC = new Item(uuidv4(),'chocolates',5,'ooey gooey')
        let itemD = new Item(uuidv4(),'candy cane',1,'crickle crackle')
        let itemE = new Item(uuidv4(),'bubblegum',2,'pop!')
        let itemF = new Item(uuidv4(),'gummy worms',3,'creepy crawlie')
        this._stock = [itemA,itemB,itemC,itemD,itemE,itemF]
        this.ShowItems()
        this.UpdateCart()
    }
    
}

const loginbutton = <HTMLInputElement>document.getElementById('submitbutton')
loginbutton.addEventListener('click',(event)=>Shop.loginUser(event))
