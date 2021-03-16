import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment } from './../../environments/environment';

import { Post } from "../posts/post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<any>(
        `${environment.apiBaseURL}/fetchPosts`
      );
      
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>(`${environment.apiBaseURL}/posts`, post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
