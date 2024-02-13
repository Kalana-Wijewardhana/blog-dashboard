import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit{ 

  permalink:String ='';
  imgSrc: any = './assets/image_placeholder2.png'; 
  selectedImg:String = '';


  categories: Array<any> = [];
  postForm!:FormGroup 
  post:any;
  formStatus:String = 'Add New';
  docId!:String

  constructor(
    private categoriService:CategoriesService,
    private fb:FormBuilder,
    private postService:PostsService,
    private route: ActivatedRoute
    ){

      this.route.queryParams.subscribe(val =>{
        this.docId = val['id'];

        if(this.docId){
          this.postService.loadOneData(val['id']).subscribe(post =>{

            this.post = post;
            this.postForm = this.fb.group({
              title:[this.post.title,[Validators.required,Validators.minLength(10)]],
              permalink:[this.post.permalink,Validators.required],
              expect:[this.post.expect,[Validators.required,Validators.minLength(50)]],
              category:[`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
              postImage:[this.post.postImage,Validators.required],
              content:[this.post.content,Validators.required],
            })
            this.imgSrc = this.post.postImgPath;
            this.formStatus = 'Edit '
            
          });
        }else{
          this.postForm = this.fb.group({
            title:['',[Validators.required,Validators.minLength(10)]],
            permalink:['',Validators.required],
            expect:['',[Validators.required,Validators.minLength(50)]],
            category:['',Validators.required],
            postImage:['',Validators.required],
            content:['',Validators.required],
          })
        }

        
      })

      
    }

  ngOnInit(): void {
    this.categoriService.loadData().subscribe(val =>{
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls
  }

  onTitleChanged($event:any){
 
   const title = $event.target.value;
   this.permalink = title.replace(/\s+/g, '-');
   
  }
  showPreview($event:any){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  onSubmit(){
    
    let splitted = this.postForm.value.category.split('-');
   
    const postData:Post = {
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1],
    },
    postImgPath:'',
    expect:this.postForm.value.expect,
    content:this.postForm.value.content,
    isFeatured:false,
    views:0,
    status:'new',
    createAt:new Date()


    }
    this.postService.uploadImage(this.selectedImg,postData,this.docId,this.formStatus)
    this.postForm.reset();
    this.imgSrc = './assets/image_placeholder2.png'; 
  }

}
