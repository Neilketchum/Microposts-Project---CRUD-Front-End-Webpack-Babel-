import { http } from './http';
// Get Posts on Dom Load
import { ui } from './ui'
document.addEventListener('DOMContentLoaded',getPosts);
document.querySelector('.post-submit').addEventListener('click',submitPost);
document.querySelector('#posts').addEventListener('click',deletePosts)
// Liten for EDit state
document.querySelector('#posts').addEventListener('click',enableEdit)
// Listen For Cancell
document.querySelector('.card-form').addEventListener('click',cancelEdit)

function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
}

function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const data = {
            id,
            title,
            body
        }
        ui.fillForm(data);
    }
    e.preventDefault()
}

function getPosts(){
    http.get('http://localhost:3000/posts').then(
    data => ui.showPosts(data)
    ).catch(
        err=> console.log(err)
    )
}
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id =  document.querySelector('#id').value;
    // Create Post 
    if(title === '' || body === ''){
        ui.showAlert("Please Fill all fields ",'alert alert-danger')
    }else{
        if(id){
            const data = {
                title : title,
                body: body
            }
            http.post('http://localhost:3000/posts',data).then(
                data =>{
                    ui.showAlert('Posts Added','alert alert-success')
                    ui.clearFields()
                    getPosts(data)
                }).catch(
                err => console.log(err)
                )
        }else{

            // update post
            http.put(`http://localhost:3000/posts/${id}`,data).then(
                data =>{
                    ui.showAlert('Posts Updated','alert alert-success')
                    ui.clearFields()
                    ui.changeFormState('add')
                    getPosts(data)
                }).catch(
                err => console.log(err)
                )

        }
       
    }
}
function deletePosts(e){
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id
        if(confirm("Are You Sure")){
            http.delete(`http://localhost:3000/posts/${id}`).then(
                data =>{
                    ui.showAlert("Posts Removed",'alert alert-success')
                    getPosts()
                }
            ).catch(
                err=>console.log(err)
            )
        }
    }
    e.preventDefault()
}
