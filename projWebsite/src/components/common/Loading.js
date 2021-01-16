import InfoIcon from '@material-ui/icons/Info';

const styles = {
    center: {
        textAlign: 'center',
        marginTop: '100px',
        marginBottom: '100px',
    },
    imageSize: {
        width: '100px',
        height: '100px',
    }
}

export const pageLoading = (
    <div style={styles.center}>
        <img style={styles.imageSize} src={require('./../../assets/loading.gif').default} />
    </div>
)

export const pageError = (
    <div style={styles.center}>
        <InfoIcon fontSize='large'></InfoIcon>
        <p style={{fontSize: '20px'}}>Oops! Something Went Wrong...</p>
    </div>
)
