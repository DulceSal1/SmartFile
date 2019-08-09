import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';
import booksimg from './resources/img/books.png';
import Booksdata from './resources/jsons/Booksdata.json';
import Booksheader from './resources/jsons/Booksheader.json';
import Table from './components/Table/Table';

class App extends React.PureComponent {
	state = {
		books:Booksdata,
			input: {
			add: '',
			remove: ''
		},
		search:'',
		header:Booksheader
	};

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
			draft.books[index].items = draft.books[index].items.concat(draft.books[index].add);
			draft.books[index].items.add = ''
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
			console.log(value);
			
		});
		this.setState(nextState);
	};

	render() {
		const { books,header} = this.state;
		return (
			<div className={styles.alignBoard}>				
				<div className={styles.menu}>
					<h3>SmartFile</h3>
					<img src={booksimg} alt="SmartFile" width="300px" />
					<fieldset>
					<legend className={styles.field}>Buscar:</legend>
					<Input type="text" value={this.state.search} onChange={this.onSearchInputChange}/>
					<fieldset><legend className={styles.field}>Por Título:</legend>
					</fieldset>
					<fieldset><legend className={styles.field}>Por Autor:</legend>
					</fieldset>
					<fieldset><legend className={styles.field}>Por Editorial:</legend>
					</fieldset>
					</fieldset>
					<fieldset className={styles.field}>
					<legend>Agregar categoría:</legend>
						<div className={styles.renglon}>
						<Input type="text" value={this.state.input.add} onChange={this.onAddBoardInputChange}/>
                        <Button type={'add'} onClick={this.onAddBoardButtonClick} />
						</div>
					</fieldset>
				</div>

				<div className={styles.libreria}>
					{books.map((i,index) => (
						<Table key={index} data={i.items} headers={header} genre={i.Genre} object={i} onAddTitleInputChange={(event) => this.AddTitleInputChange(event,index)}  onAddAuthorInputChange={(event) => this.AddAuthorInputChange(event,index)} onAddHeightInputChange={(event) => this.AddHeightInputChange(event,index)} onAddPublisherInputChange={(event) => this.AddPublisherInputChange(event,index)}  onAddBookClick={()=>this.AddBookClick(index)} onRemBookClick={(i)=>this.RemBookClick(i, index)}/>
					))}		
				</div>
			</div>
		);
	}
}

export default App;
