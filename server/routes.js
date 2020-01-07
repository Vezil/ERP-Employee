module.exports = (app) => {

    app.post('/create',(req,res)=>{
        res.send({
          message:`created. hello ! ${req.body.surname}`
        })
      })
}
