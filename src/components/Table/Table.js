import * as React from 'react';
import styles from './Table.module.scss';
import CurrencyFormat from 'react-currency-format';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { IconXMark } from '../../resources/svg/Icons';

export default (class Table extends React.PureComponent {
	formatData = (data, type) => {
		switch (type) {
			case 'text':
				return data;
			case 'number':
				return data.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
			case 'money':
				return <CurrencyFormat value={data} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />;
			default:
				return data;
		}
	};



	render() {
		const { headers, data, genre, object,onAddTitleInputChange, onAddAuthorInputChange,onAddHeightInputChange,onAddPublisherInputChange,onAddBookClick,onRemBookClick} = this.props;
		return (
			<div className={styles.main}>
                <h2>{genre}</h2>
				<table className={styles.table}>                    
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, i) => {
								return (
									<th key={i} className={styles.header_item}>
										{header.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						{data.map((item, i) => {
							return (
								<tr key={i} className={styles.row}>
									{headers.map((header, i) => {
										return (
											<td key={i} className={styles.row_item}>
												{this.formatData(item[header.value], header.type)}
											</td>
										);
									})}
									<td>
									<div onClick={()=>onRemBookClick(i)}>
										<IconXMark className={styles.icon} />
									</div>
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							<td className={styles.footer_item}>
							<Input type="text" value={object.add.Title} onChange={onAddTitleInputChange}/>
							</td>
							<td className={styles.footer_item}>
							<Input type="text" value={object.add.Author} onChange={onAddAuthorInputChange}/>
							</td>
							<td className={styles.footer_item}>
							<Input type="text" value={object.add.Height} onChange={onAddHeightInputChange}/>
							</td>
							<td className={styles.footer_item}>
							<Input type="text" value={object.add.Publisher} onChange={onAddPublisherInputChange}/>
							</td>
							<td className={styles.footer_item}>
							<Button type={'add'} onClick={onAddBookClick} />
							</td>
							
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
