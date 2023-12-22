const express= require('express');
const path= require('path');
const mongoose= require('mongoose');
const cors= require("cors")
const dotenv= require('dotenv');
dotenv.config();

const app = express();
const productRouter= require('./router/products');
const cartRouter= require('./router/cart');
const userRouter= require('./router/user');
const ordersRouter= require('./router/orders');

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Connection successful`)
})
.catch((err)=> console.log(err));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', ordersRouter);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port= process.env.PORT||5000;

app.listen(port, ()=>{
    console.log('App listening at port ' + port);
})



