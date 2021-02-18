function deleteStream(){
    let id = document.querySelector('.strmId').innerHTML
    
    fetch('/stream/delete/' + document.querySelector('.strmId').innerHTML,{
        method:'DELETE'
    })
    .then(res=> document.location.reload())
    //.catch(err=> console.error(err))
}

const delete_btn = document.querySelector('.delete-btn')
console.log(delete_btn)
if(delete_btn){
    console.log(delete_btn)
    delete_btn.addEventListener('click', deleteStream,false)
}

