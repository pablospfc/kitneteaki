import { Component, OnInit } from '@angular/core';
import {ModeloDocumentoModel} from '../../_models/modelo-documento.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
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

   typeInTextarea(el, newText) {
    var start = el.prop("selectionStart")
    var end = el.prop("selectionEnd")
    var text = el.val()
    var before = text.substring(0, start)
    var after  = text.substring(end, text.length)
    el.val(before + newText + after)
    el[0].selectionStart = el[0].selectionEnd = start + newText.length
    el.focus()
    return false;
  }

  addText(value) {
    this.typeInTextarea($('#editor'), value)
    return false;
  }


}
