import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { editor } from 'monaco-editor';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { Subscription } from 'rxjs';
import { Language } from '../models/note.model';
import { NoteService } from '../services/note.service';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../utility/loader/loader.component';
import { environment } from '../../environments/environment';
import { DimmerComponent } from '../utility/dimmer/dimmer.component';

type Theme = 'vs' | 'vs-dark' | 'hc-light' | 'hc-black';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    SnackbarComponent,
    LoaderComponent,
    DimmerComponent,
  ],
  providers: [NoteService],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
})
export class EditorPageComponent implements OnDestroy, OnInit {
  readonly languages: { name: string; value: Language }[] = [
    { name: 'ABAP', value: 'abap' },
    { name: 'Apex', value: 'apex' },
    { name: 'Azure CLI', value: 'azcli' },
    { name: 'Batch', value: 'bat' },
    { name: 'Bicep', value: 'bicep' },
    { name: 'Cameligo', value: 'cameligo' },
    { name: 'Clojure', value: 'clojure' },
    { name: 'CoffeeScript', value: 'coffee' },
    { name: 'C++', value: 'cpp' },
    { name: 'C#', value: 'csharp' },
    { name: 'CSP', value: 'csp' },
    { name: 'CSS', value: 'css' },
    { name: 'Cypher', value: 'cypher' },
    { name: 'Dart', value: 'dart' },
    { name: 'Dockerfile', value: 'dockerfile' },
    { name: 'ECL', value: 'ecl' },
    { name: 'Elixir', value: 'elixir' },
    { name: 'Flow9', value: 'flow9' },
    { name: 'F#', value: 'fsharp' },
    { name: 'Freemarker2', value: 'freemarker2' },
    { name: 'Go', value: 'go' },
    { name: 'GraphQL', value: 'graphql' },
    { name: 'Handlebars', value: 'handlebars' },
    { name: 'HCL', value: 'hcl' },
    { name: 'HTML', value: 'html' },
    { name: 'INI', value: 'ini' },
    { name: 'Java', value: 'java' },
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Julia', value: 'julia' },
    { name: 'Kotlin', value: 'kotlin' },
    { name: 'LESS', value: 'less' },
    { name: 'Lexon', value: 'lexon' },
    { name: 'Lua', value: 'lua' },
    { name: 'Liquid', value: 'liquid' },
    { name: 'M3', value: 'm3' },
    { name: 'Markdown', value: 'markdown' },
    { name: 'MDX', value: 'mdx' },
    { name: 'MIPS', value: 'mips' },
    { name: 'MSDAX', value: 'msdax' },
    { name: 'MySQL', value: 'mysql' },
    { name: 'Objective-C', value: 'objective-c' },
    { name: 'Pascal', value: 'pascal' },
    { name: 'Pascaligo', value: 'pascaligo' },
    { name: 'Perl', value: 'perl' },
    { name: 'PostgreSQL', value: 'pgsql' },
    { name: 'PHP', value: 'php' },
    { name: 'PLA', value: 'pla' },
    { name: 'Postiats', value: 'postiats' },
    { name: 'PowerQuery', value: 'powerquery' },
    { name: 'PowerShell', value: 'powershell' },
    { name: 'Protobuf', value: 'protobuf' },
    { name: 'Pug', value: 'pug' },
    { name: 'Python', value: 'python' },
    { name: 'Q#', value: 'qsharp' },
    { name: 'R', value: 'r' },
    { name: 'Razor', value: 'razor' },
    { name: 'Redis', value: 'redis' },
    { name: 'Redshift', value: 'redshift' },
    { name: 'reStructuredText', value: 'restructuredtext' },
    { name: 'Ruby', value: 'ruby' },
    { name: 'Rust', value: 'rust' },
    { name: 'SB', value: 'sb' },
    { name: 'Scala', value: 'scala' },
    { name: 'Scheme', value: 'scheme' },
    { name: 'SCSS', value: 'scss' },
    { name: 'Shell', value: 'shell' },
    { name: 'Solidity', value: 'solidity' },
    { name: 'Sophia', value: 'sophia' },
    { name: 'SPARQL', value: 'sparql' },
    { name: 'SQL', value: 'sql' },
    { name: 'ST', value: 'st' },
    { name: 'Swift', value: 'swift' },
    { name: 'SystemVerilog', value: 'systemverilog' },
    { name: 'Tcl', value: 'tcl' },
    { name: 'Twig', value: 'twig' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'TypeSpec', value: 'typespec' },
    { name: 'VB', value: 'vb' },
    { name: 'WGSL', value: 'wgsl' },
    { name: 'XML', value: 'xml' },
    { name: 'YAML', value: 'yaml' },
  ];
  readonly themes: { name: string; value: Theme }[] = [
    { name: 'Light', value: 'vs' },
    { name: 'Dark', value: 'vs-dark' },
    { name: 'HC Light', value: 'hc-light' },
    { name: 'HC Dark', value: 'hc-black' },
  ];

  private id: string | null;
  private readonly subscription = new Subscription();
  private readonly defaultErrMsg =
    'Something went wrong! Please try again later.';

  content: string = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;
  link: string | undefined;
  modified = signal(false);

  message = signal<{
    content: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  editorOptions: editor.IStandaloneEditorConstructionOptions & {
    language: Language;
    theme: Theme;
  } = {
    theme: <Theme>localStorage.getItem('theme') ?? 'vs',
    language: 'html',
    automaticLayout: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscription.add(
        this.noteService.getNote(this.id).subscribe({
          next: (response) => {
            this.loaderService.editorInit.set(false);
            this.link = `${environment.site}/${this.id}`;
            this.content = response.data.note.code;
            this.editorOptions = {
              ...this.editorOptions,
              value: this.content,
              language: response.data.note.language,
            };
          },
          error: (error) => {
            this.message.set({
              content: error.error.message ?? this.defaultErrMsg,
              type: 'error',
            });
          },
          complete: () => {
            this.message.set({
              content: 'Successfully.',
              type: 'success',
            });
          },
        })
      );
    }
  }

  onEditorInit(editor: editor.IStandaloneCodeEditor) {
    this.loaderService.editorInit.set(true);
    editor.onDidChangeModelContent((event) => {
      if (!event.isFlush) this.modified.set(true);
    });
  }

  onChangeLanguage(language: Language) {
    this.loaderService.editorInit.set(false);
    this.editorOptions = { ...this.editorOptions, language };
  }

  onChangeTheme(theme: Theme) {
    this.loaderService.editorInit.set(false);
    localStorage.setItem('theme', theme);
    this.editorOptions = { ...this.editorOptions, theme };
  }

  getCurrentThemeName(value: Theme) {
    return this.themes.find((theme) => theme.value === value)?.name;
  }

  getCurrentLanguageName(value: Language) {
    return this.languages.find((lang) => lang.value === value)?.name;
  }

  onShareContent() {
    if (this.editorOptions.value === this.content.trim()) {
      this.message.set({
        content: 'The content has remained the same so why share!',
        type: 'warning',
      });
      return;
    }
    const body = {
      code: this.content,
      language: this.editorOptions.language,
    };
    if (!this.id) {
      this.subscription.add(
        this.noteService.createNote(body).subscribe({
          next: (response) => {
            this.router.navigate(['/', response.data.note._id]);
          },
          error: (error) => {
            this.message.set({
              content: error.error.message ?? this.defaultErrMsg,
              type: 'error',
            });
          },
        })
      );
    } else {
      this.subscription.add(
        this.noteService.updateNote(body, this.id).subscribe({
          next: (response) => {
            this.editorOptions.value = response.data.note.code;
          },
          error: (error) => {
            this.message.set({
              content: error.error.message ?? this.defaultErrMsg,
              type: 'error',
            });
          },
          complete: () => {
            this.message.set({
              content: 'Code has been shared.',
              type: 'success',
            });
          },
        })
      );
    }
  }

  async onCopyToClipboard(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      this.message.set({
        content: 'Text copied to clipboard.',
        type: 'success',
      });
    } catch (error) {
      this.message.set({
        content: 'Failed to copy text.',
        type: 'error',
      });
    }
  }

  hideSnackbar() {
    return setTimeout(() => this.message.set(null), 3000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
