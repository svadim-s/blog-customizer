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
import { useClose } from './hooks/useCloseForm';

interface ArticleParamsFormProps {
	setStyle: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({ setStyle }: ArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLElement>(null);

	const toggleForm: OnClick = () => {
		setFormOpen(!isFormOpen);
	};

	useClose({
		isOpen: isFormOpen,
		rootRef: formRef,
		onClose: () => setFormOpen(false),
	});

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStyle(formState);
		setFormOpen(false);
	};

	const resetForm = () => {
		setFormState(defaultArticleState);
		setStyle(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} formOpen={isFormOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(newValue: OptionType) =>
							handleChange('fontFamilyOption', newValue)
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(newValue: OptionType) =>
							handleChange('fontSizeOption', newValue)
						}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(newValue: OptionType) =>
							handleChange('fontColor', newValue)
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(newValue: OptionType) =>
							handleChange('backgroundColor', newValue)
						}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(newValue: OptionType) =>
							handleChange('contentWidth', newValue)
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
