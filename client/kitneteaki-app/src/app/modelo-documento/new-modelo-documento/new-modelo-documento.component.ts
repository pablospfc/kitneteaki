import { Component, OnInit } from '@angular/core';
import {ModeloDocumentoModel} from '../../_models/modelo-documento.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-new-modelo-documento',
  templateUrl: './new-modelo-documento.component.html',
  styleUrls: ['./new-modelo-documento.component.scss']
})
export class NewModeloDocumentoComponent implements OnInit {

  modelo: ModeloDocumentoModel;
  public Editor = ClassicEditor;
  private ckEditorBlurEle;
  constructor() { }

  ngOnInit() {
    this.modelo = new ModeloDocumentoModel();
  }

  onSubmit(form: NgForm) {

  }

  public ckEditorOnBlur(event) {
    var selection = event.editor.getSelection();
    var ranges = selection.getRanges();
    var range = ranges[0];

    // Create a new range from the editor object
    var newRange = event.editor.createRange();

    // assign the newRange to move to the end of the current selection
    // using the range.endContainer element.
    var moveToEnd = true;
    newRange.moveToElementEditablePosition(range.endContainer, moveToEnd);

    // change selection
    var newRanges = [newRange];
    selection.selectRanges(newRanges);
    // now I can insert html without erasing the previously selected text.
    // event.editor.insertHtml("<span>Hello World!</span>");

    this.ckEditorBlurEle = event;
    this.ckEditorBlurEle.editor.insertHtml('Hello World...!');
  }

}
