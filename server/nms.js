const NodeMediaServer = require('node-media-server');
const config = require('./config');
let nms = new NodeMediaServer(config.rtmp_server);
const User = require('./db/models/user.model')
const Strms = require('./db/models/streams.model1')

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    //ищем пользователя с таким ключём
    const candidate = await User.findOne({where:{key: stream_key}})
    if(!candidate) {
        let session = nms.getSession(id)
        return session.reject()
    }else{
        //ищем стрим, автор которого должен быть этот юзер
        const stream = await Strms.findOne({where:{
            authorLogin: candidate.login
        }})
        if(!stream) {
            let session = nms.getSession(id)
            return session.reject()
        }else{
            await stream.update({state: 'online', nmsId: id})
            await stream.save()

            await candidate.update({nmsStreamID: id})
            await candidate.save()
        }
        
    }

})

nms.on('doneConnect', async (id, args) => {
   ///это типо дисконнект
   //ищем по nmsId находим и удаляем к хуям)))


    console.log('Connection done', JSON.stringify(args));

    const stream = await Strms.findOne({where:{
        nmsId: id
    }});
    if(stream){
        try {
           
           
            try {
                console.log("ID:", id)
                const user = await User.findOne({where:{
                    nmsStreamID: id
                }})
                if(user){
                    await user.update({streamID:'',nmsStreamID:''});
                    await user.save();

                    await stream.destroy();
                    
                    console.log(`Stream [${id}] destroyed`)
                }else{
                    console.log(`Stream [${id}] NOT destroyed 1`)
                }
              
            } catch (error) {
                console.log(`Stream [${id}] NOT destroyed 2`)
            }

        } catch (error) {
            console.log(`Stream [${id}] NOT destroyed 3`)
        }
    
    }
   
    
    
    


});

const getStreamKeyFromStreamPath = (path) =>{
    let parts = path.split('/');
    return parts[parts.length - 1];
}

module.exports = nms;