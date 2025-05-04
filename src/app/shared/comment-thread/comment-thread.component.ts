import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-thread',
  imports: [CommonModule],
  templateUrl: './comment-thread.component.html',
  styleUrl: './comment-thread.component.css'
})
export class CommentThreadComponent {
  comments = [
    {
      name: 'Elliot Alderson',
      avatar: 'https://source.unsplash.com/40x40/?man,face',
      date: 'October 9, 2024',
      text: "I’ve been following your blog for a while now, and this post might be your best one yet!",
      replies: [
        {
          name: 'Ethan Caldwell',
          avatar: 'https://source.unsplash.com/40x40/?profile,author',
          date: 'October 9, 2024',
          text: 'Thank you for your feedback! It’s great to know the post made an impact.',
        }
      ]
    },
    {
      name: 'Joanna Wellick',
      avatar: 'https://source.unsplash.com/40x40/?woman,face',
      date: 'October 9, 2024',
      text: 'Your writing is so clear and concise. I’m always excited when you publish something new.',
      replies: []
    }
  ];
}
