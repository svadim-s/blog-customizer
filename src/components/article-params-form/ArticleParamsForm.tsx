import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from '../arrow-button';
import { OnClick } from '../arrow-button/ArrowButton';
import clsx from 'clsx';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from '../text/Text';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useCloseForm } from './hooks/useCloseForm';

interface ArticleParamsFormProps {
	setStyle: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({ setStyle }: ArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm: OnClick = () => {
		setFormOpen(!isFormOpen);
	};

	useCloseForm({
		isFormOpen: isFormOpen,
		rootRef: formRef,
		onCloseForm: () => setFormOpen(false),
	});

	const handleFontFamilyChange = (newFontFamily: OptionType) => {
		setFontFamily(newFontFamily);
	};

	const handleFontSizeChange = (newFontSize: OptionType) => {
		setFontSize(newFontSize);
	};

	const handleFontColorChange = (newFontColor: OptionType) => {
		setFontColor(newFontColor);
	};

	const handleBackgroundColorChange = (newBackgroundColor: OptionType) => {
		setBackgroundColor(newBackgroundColor);
	};

	const handleContentWidthChange = (newContentWidth: OptionType) => {
		setContentWidth(newContentWidth);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStyle({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			contentWidth: contentWidth,
			backgroundColor: backgroundColor,
		});
		setFormOpen(false);
	};

	const resetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setStyle(defaultArticleState);
	};

	return (
		<div ref={formRef}>
			<ArrowButton onClick={toggleForm} formOpen={isFormOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
