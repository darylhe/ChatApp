import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../user';

@Component({
  selector: 'app-group-name-prompt',
  templateUrl: './group-name-prompt.component.html',
  styleUrls: ['./group-name-prompt.component.css']
})
export class GroupNamePromptComponent implements OnInit {

  name = '';

  constructor() { }

  ngOnInit() {
  }

}
