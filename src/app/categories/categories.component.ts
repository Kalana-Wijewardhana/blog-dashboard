import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriesService, Category } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray!: Array<Category>;
  formCategory!:String;
  formStatus: String = 'Add';
  categoryId!:String;

  constructor(
     private categoryService:CategoriesService 
     ){}
  
  ngOnInit():void{
    this.categoryService.loadData().subscribe(val => {
      console.log(val);
       this.categoryArray = val;
    })

  }

  onSubmit(formData: any){
    let categoryData = {
      category:formData.value.category
    }

    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();
      this.formStatus='Add';
    }
  
    
//qurey for saving data
    // this.afs.collection('categories').add(categoryData)
    // .then(docRef =>{
    //   console.log(docRef);

    //   this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)

    //   // this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData)
    //   .then(docRef1 =>{
    //     console.log(docRef1);

    //     this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subsubcategories').add(subSubCategoryData)

    //     // this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subsubcategories').add(subSubCategoryData)
    //     .then(docRef2 =>{
    //       console.log(docRef2)
    //     })
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  onEdit(category:any,id:any){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id:any){
    this.categoryService.deleteData(id);
  }

}
