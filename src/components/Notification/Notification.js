import './Notification.scss'

export default function Notification({
    message,
    type
}) {

    return (
        <div className={'notification ' + type}>{message}</div>
    )
}