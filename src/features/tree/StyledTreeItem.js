import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTreeItemStyles } from "./treeItem.css";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

function computeLabelIcon(LabelIcon, classes) {
    if (LabelIcon === ArrowRight) {
        return <Typography className={classes.outPredicateIcon}>
            →
        </Typography>
    } else if (LabelIcon === ArrowLeft) {
        return <Typography className={classes.inPredicateIcon}>
            ←
        </Typography>
    }
    return <LabelIcon color="inherit" className={classes.labelIcon} />
}

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {computeLabelIcon(LabelIcon, classes)}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit" className={classes.labelInfo}>
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

export default StyledTreeItem;