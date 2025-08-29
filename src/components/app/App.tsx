import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './App.module.css';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const resetHandler = () => {
		setArticleState({ ...defaultArticleState });
	};

	const applyHandler = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				resetHandler={resetHandler}
				applyHandler={applyHandler}
				articleState={articleState}
			/>
			<Article />
		</main>
	);
};
