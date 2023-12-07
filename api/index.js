const express= require('express');
const mongoose= require('mongoose');
const cors= require("cors")
const dotenv= require('dotenv');
dotenv.config();

const app = express();
const productRouter= require('./router/products');
const cartRouter= require('./router/cart');
const userRouter= require('./router/user');

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connection successful`)
})
.catch((err)=> console.log(err));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/products', productRouter);

const port= process.env.PORT||5000;

app.listen(port, ()=>{
    console.log('App listening at port ' + port);
})



