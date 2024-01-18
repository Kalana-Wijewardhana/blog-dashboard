import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

export interface Category {
  id: any;
  data: {
    category: any;
  
  };
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs:AngularFirestore,
    private toaster:ToastrService
    ) { }

  saveData(data:any){
    //qurey for saving data
    this.afs.collection('categories').add(data)
    .then(docRef =>{
      console.log(docRef);
      this.toaster.success('Data Insert Successfully...!')
    })
    .catch(err => {
      console.log(err)
    })

  }

  loadData(){
   return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id,data } as Category;
        })
      })
    )
  }
  updateData(id:any, EditData:any){
    this.afs.collection('categories').doc(id).update(EditData)
    .then(docRef =>{this.toaster.success('Data Update Successfully...!')})

  }

  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete()
    .then(docRef =>{this.toaster.success('Data Delete Successfully...!')})
  }
}
 