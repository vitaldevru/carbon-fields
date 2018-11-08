/**
 * External dependencies.
 */
import cx from 'classnames';
import { Component } from '@wordpress/element';
import { BaseControl, Icon, IconButton, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import './style.scss';

class AssociationField extends Component {
	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			field,
			options,
			totalOptionsCount,
			value,
			onAddItem,
			onRemoveItem,
			onQueryTermChange
		} = this.props;

		return (
			<BaseControl
				className="cf-field-association-wrapper"
				label={ field.label }
			>
				<strong className="cf-field-association__counter">
					showing { options.length } of { totalOptionsCount } results
				</strong>

				<div className="cf-field-association">
					<div className="cf-field-association__body">
						<div className="cf-field-association__search-bar">
							<TextControl
								value={ field.queryTerm }
								onChange={ onQueryTermChange }
								placeholder={ carbonFieldsL10n.field.searchPlaceholder }
							/>
						</div>

						<div className="cf-field-association__col cf-field-association__col--source">
							{
								options.map( ( option, index ) => {
									return (
										<div className={ cx( 'cf-field-association__option', { 'cf-field-association__option--selected': option.disabled } ) } key={ index }>
											<img className="cf-field-association__option-thumbnail" src={ option.thumbnail ? option.thumbnail : '' } />

											<div className="cf-field-association__option-content">
												<span className="cf-field-association__option-title">
													{ option.title }
												</span>

												<span className="cf-field-association__option-type">
													{ option.type }
												</span>
											</div>

											<div className="cf-field-association__option-actions">
												<IconButton
													icon="edit"
													label="Edit"
													href={ option.edit_link }
													target="_blank"
												/>

												<IconButton
													icon="plus-alt"
													label="Add"
													onClick={ () => onAddItem( option ) }
												/>
											</div>
										</div>
									);
								} )
							}
						</div>

						<div className="cf-field-association__col cf-field-association__col--selected">
							{
								value.map( ( option, index ) => {
									return (
										<div className="cf-field-association__option" key={ index }>
											<div className="cf-field-association__option-sort">
												<Icon
													icon="menu"
												/>
											</div>

											<img className="cf-field-association__option-thumbnail" src={ option.thumbnail ? option.thumbnail : '' } />

											<div className="cf-field-association__option-content">
												<span className="cf-field-association__option-title">
													{ option.title }
												</span>

												<span className="cf-field-association__option-type">
													{ option.type }
												</span>
											</div>

											<div className="cf-field-association__option-actions">
												<IconButton
													icon="editor-removeformatting"
													label="Remove"
													onClick={ () => onRemoveItem( option ) }
												/>
											</div>
										</div>
									);
								} )
							}
						</div>
					</div>
				</div>
			</BaseControl>
		);
	}
}

addFilter( 'carbon-fields.association-field.block', 'carbon-fields/blocks', ( OriginalAssociationField ) => ( props ) => {
	return (
		<OriginalAssociationField { ...props }>
			{ ( {
				field,
				value,
				options,
				totalOptionsCount,
				handleChange,
				handleAddItem,
				handleRemoveItem,
				handleQueryTermChange
			} ) => (
				<AssociationField
					field={ field }
					value={ value }
					options={ options }
					totalOptionsCount={ totalOptionsCount }
					onChange={ handleChange }
					onAddItem={ handleAddItem }
					onRemoveItem={ handleRemoveItem }
					onQueryTermChange={ handleQueryTermChange }
				/>
			) }
		</OriginalAssociationField>
	);
} );
