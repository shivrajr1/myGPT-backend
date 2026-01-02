
import { Thread } from "../models/threadSchema.js"
import { huggingAi } from "../utils/huggingAi.js"


export const getTitles=async(req,res)=>{
    try {
        const titles=await Thread.find({}).select('title')
        res.send(titles)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getThread=async(req,res)=>{
    try {
        let {id}=req.params
        let thread= await Thread.findById(id)
        res.send(thread)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addThread=async(req,res)=>{
    try {
        let {id, message}=req.body
        if (!message || !message.trim())
            return res.status(400).send('enter some prompt')

        let thread;
        if(id){
            try {
                thread= await Thread.findById(id)
            } catch (error) {
                return res.status(400).send('id is not valid')
            }
        }else{
            thread=new Thread({title:message})
        }
        
        thread.message.push({role:'user',content:message})
        let aiResponse=await huggingAi(thread.message)
        let aiMessage=aiResponse.choices[0].message.content
        thread.message.push({role:'assistant',content:aiMessage})

        await thread.save()
        res.send({role:'assistant',content:aiMessage ,id:thread._id})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteThread=async(req,res)=>{
    try {
        let {id}=req.params
        await Thread.findByIdAndDelete(id)
        res.send('thread deleted successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

