import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';
import booksimg from './resources/img/books.png';
import Booksdata from './resources/jsons/Booksdata.json';
import Booksheader from './resources/jsons/Booksheader.json';
import Table from './components/Table/Table';
import firebase from 'firebase';


class App extends React.PureComponent {
	state = {
		books:Booksdata,
			input: {
			add: '',
			remove: ''
		},
		search:'',
		header:Booksheader,
		resultByTitle:'',
		resultByAuthor:'',
		resultByEdit:'',
		fileurl:''
	};

	handeUploadSuccess = (filename) => {
		const nextState = produce(this.state, (draft) => {
			draft.fileurl=filename;
		});
		this.setState(nextState);

		firebase.storage().ref('libros').child(filename).getDownloadURL().
		then(url => this.setState({fileurl: url}));

	}
	
	onAddBoardInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input.add = value;
		});
		this.setState(nextState);
	};

	onAddBoardButtonClick = () => {
		const nextState = produce(this.state, (draft) => {
			const newBoardtitle=draft.input.add;
			const newBoard ={
				Genre: newBoardtitle,
				items: [], 
				index: 0,
				add: {
					Title: "",
					Author: "",
					Height: "",
					Publisher: "",
					File:""
				}, 
				remove: ""				
			};
			draft.books.push(newBoard);
			draft.input.add = '';	
		});
		this.setState(nextState);
	};

	AddTitleInputChange = (event,index) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.books[index].add.Title= value;
		});
		this.setState(nextState);
	};

	AddAuthorInputChange = (event,index) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.books[index].add.Author= value;
		});
		this.setState(nextState);
	};

	AddHeightInputChange = (event,index) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.books[index].add.Height= value;
		});
		this.setState(nextState);
	};

	AddPublisherInputChange = (event,index) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.books[index].add.Publisher= value;
		});
		this.setState(nextState);
	};

	AddBookClick = (index) => {
		const nextState = produce(this.state, (draft) => {
			draft.books[index].add.File= draft.fileurl;
			draft.books[index].items = draft.books[index].items.concat(draft.books[index].add);
			draft.books[index].items.add = '';			
			draft.books[index].fileurl= '';
		});
		this.setState(nextState);
	};
 
	RemBookClick= (i, index) => {
		const nextState = produce(this.state, (draft) => {
			draft.books[index].items.splice(i, 1);
			});
			this.setState(nextState);
	};

	onSearchInputChange= (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.search = value;

			let k1=0;
			draft.resultByTitle='';
			let k2=0;
			draft.resultByAuthor='';
			let k3=0;
			draft.resultByEdit='';

			for (let i = 0; i < draft.books.length ; i++) {				
				for (let j = 0; j < draft.books[i].items.length ; j++) {				
					if(value !== '' && draft.books[i].items[j].Title.toLowerCase().includes(value.toLowerCase())){
						draft.resultByTitle=  draft.resultByTitle + "["+draft.books[i].items[j].Title + '-' + draft.books[i].items[j].Author + '-'  + draft.books[i].items[j].Publisher  + '], ';
						k1++;
					}				
				}					
			}
			if(k1===0){draft.resultByTitle='';}	

			
			for (let i = 0; i < draft.books.length ; i++) {				
				for (let j = 0; j < draft.books[i].items.length ; j++) {
					let sauthor=draft.books[i].items[j].Author.replace(',','');	
					console.log(sauthor);
					if(value !== '' && sauthor.toLowerCase().includes(value.toLowerCase())){
						draft.resultByAuthor=  draft.resultByAuthor + "["+draft.books[i].items[j].Title + '-'  + draft.books[i].items[j].Author+ '-'  + draft.books[i].items[j].Publisher  + '], ';
						k2++;
					}				
				}					
			}
			if(k2===0){draft.resultByAuthor='';}	


			for (let i = 0; i < draft.books.length ; i++) {				
				for (let j = 0; j < draft.books[i].items.length ; j++) {				
					if(value !== '' && draft.books[i].items[j].Publisher.toLowerCase().includes(value.toLowerCase())){
						draft.resultByEdit=  draft.resultByEdit + "["+draft.books[i].items[j].Title + '-'  + draft.books[i].items[j].Author + '-'  + draft.books[i].items[j].Publisher + '], ';
						k3++;
					}				
				}					
			}
			if(k3===0){draft.resultByEdit='';}
			
		});
		this.setState(nextState);
	};

	render() {
		console.log(this.state);
		const { books,header,resultByTitle,resultByAuthor,resultByEdit} = this.state;
		return (
			<div className={styles.alignBoard}>				
				<div className={styles.menu}>
					<h3>SmartFile</h3>
					<img src={booksimg} alt="SmartFile" width="300px" />
					<fieldset>
					<legend className={styles.field}>Buscar:</legend>
					<Input type="text" value={this.state.search} onChange={this.onSearchInputChange}/>
					<fieldset><legend className={styles.field}>Por Título:</legend>
					{resultByTitle}
					</fieldset>
					<fieldset><legend className={styles.field}>Por Autor:</legend>
					{resultByAuthor}
					</fieldset>
					<fieldset><legend className={styles.field}>Por Editorial:</legend>
					{resultByEdit}
					</fieldset>
					</fieldset>
					<fieldset className={styles.field}>
					<legend>Agregar categoría:</legend>
						<div className={styles.renglon}>
						<Input type="text" value={this.state.input.add} onChange={this.onAddBoardInputChange}/>
                        <Button type={'add'} onClick={this.onAddBoardButtonClick}>Subir</Button> />
						</div>
					</fieldset>
				</div>

				<div className={styles.libreria}>
					{books.map((i,index) => (
						<Table key={index} onhandeUploadSuccess={this.handeUploadSuccess} data={i.items} headers={header} genre={i.Genre} object={i} onAddTitleInputChange={(event) => this.AddTitleInputChange(event,index)}  onAddAuthorInputChange={(event) => this.AddAuthorInputChange(event,index)} onAddHeightInputChange={(event) => this.AddHeightInputChange(event,index)} onAddPublisherInputChange={(event) => this.AddPublisherInputChange(event,index)}  onAddBookClick={()=>this.AddBookClick(index)} onRemBookClick={(i)=>this.RemBookClick(i, index)}/>
					))}		
				</div>
			</div>
		);
	}
}

export default App;
