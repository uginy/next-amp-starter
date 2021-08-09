import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(0)
			},
			color: blue[400],
			"&$checked": {
				color: blue[600]
			}
		},
		checked: {},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		},
		selectEmpty: {
			marginTop: theme.spacing(2)
		},
		row: {
			display: "flex",
			width: "100%",
			"& > span": {
				"& > div": { width: "100%" },
				display: "inline-block"
			}
		}
	})
);
