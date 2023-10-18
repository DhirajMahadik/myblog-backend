import express from 'express'
import  database  from './database/config.js'
import cors from 'cors'
import loginHandler  from './routes/login.js'
import addBlogHandler from './routes/addNewBlog.js'
import allBlogsHandler from './routes/allBlogs.js'
import singleBlogHandler from './routes/singleBlog.js'
import categoryHandler from './routes/category.js'
import searchHandler from './routes/searchHandler.js'
import env from 'dotenv'
 env.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Welcom')
})

app.use('/api/auth',loginHandler)

app.use('/api/add-blog',addBlogHandler)

app.use('/api/all-blogs',allBlogsHandler )

app.use('/api/blog',singleBlogHandler)

app.use('/api/blogs',categoryHandler)

app.use('/api/blogs/search',searchHandler)


database.connect((error)=>{
    if(error) throw error
    app.listen(process.env.PORT, ()=>{
        console.log('server is running')
    })
})


