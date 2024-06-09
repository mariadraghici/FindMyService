import {Card, CardContent, Icon, Stack} from '@mui/material';
import './cardlayout.css';

const CardLayout = ({children, additionalClasses }) => {
    const classes = `card-layout ${additionalClasses}`;
    return (
        <Card className={classes}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default CardLayout;