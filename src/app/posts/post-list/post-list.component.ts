import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { PostsService } from "src/app/services/posts.service";

import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts= [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((response) => {
      this.posts = response.posts;
    }); 
    this.postsService.getPostUpdateListener().subscribe((response) => {
      this.posts.push(response[0]);
    }); 
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
