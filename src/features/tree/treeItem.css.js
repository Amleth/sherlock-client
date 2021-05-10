import {makeStyles} from "@material-ui/core/styles";
import {COLOR_MI_MAGENTA, COLOR_MI_ORANGE} from "../../style";

export const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
},
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    outPredicateIcon: {
        whiteSpace: 'nowrap',
        marginRight: theme.spacing(1),
        color: COLOR_MI_ORANGE
    },
    inPredicateIcon: {
        whiteSpace: 'nowrap',
        marginRight: theme.spacing(1),
        color: COLOR_MI_MAGENTA
    },
    labelInfo: {
        whiteSpace: 'nowrap',
    }
}));