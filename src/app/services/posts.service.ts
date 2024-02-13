import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( 
    private storage: AngularFireStorage,
    private afs:AngularFirestore,
    private toasr:ToastrService,
    private router:Router
     ) {}

  uploadImage(selectedImage:any,postData:any,formStatus:any,id:any){
    const filePath = `postIMG/${Date.now()}`
    console.log(filePath)

    this.storage.upload(filePath,selectedImage)
    .then(() =>{
      console.log("post image uploaded successfully");

      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath = URL;
        console.log("postData",postData);

        if(formStatus == 'Edit'){
          this.updateData(id,postData)
        }else{
          this.saveData(postData);
        }
      })
    }

    )
  }

  saveData(postData:any){
    this.afs.collection('posts').add(postData)
    .then(docRef=>{
      this.toasr.success("successfully ");
      this.router.navigate(['/posts'])
    })
  }

  //load the all data can use snapshotChanges
  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
       map(actions =>{
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id,data } 
         })
       })
     )
   }
  //load the one data can use valueChanges
   loadOneData(id:any){
    return this.afs.doc(`posts/${id}`).valueChanges();

   }
   updateData(id:any,postData:any){
    this.afs.doc(`posts/${id}`).update(postData)
    .then(()=>{
      this.toasr.success('Data Update Sucsessfully!');
      this.router.navigate(['/posts'])
    })

   }

   deleteImage(postImgPath:any,id:any){
    this.storage.storage.refFromURL(postImgPath).delete()
    .then(()=>{
      this.deleteData(id)
    })
   }

   deleteData(id:any){
    this.afs.doc(`posts/${id}`).delete()
    .then(()=>{
      this.toasr.warning('data Deleted')
    })
   }

   markisFeatured(id:any,featuredData:any){
    this.afs.doc(`posts/${id}`).update(featuredData)
    .then(()=>{
      this.toasr.info('featured update')
    })
   }


}
