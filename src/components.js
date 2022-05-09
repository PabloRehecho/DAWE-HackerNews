import React from "react";
import Moment from 'react-moment';
import 'moment/locale/es';

export function Search({value, onChange, onSubmit, children})
{
    return(
        <form onSubmit={onSubmit}>
            {children}
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    );
}

export function Table({list, onDismiss})
{
    return(
        <div className="table">
            {list.map(item =>
                {
                    return <div key={item.objectID} className="table-row">
                    <span style={{ width: '40%' }}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                        <span style={{ width: '30%' }}> {item.author}</span>
                        <span style={{ width: '20%' }}>
                        <Moment fromNow>{item.created_at}</Moment>
                    </span>
                        <span style={{ width: '10%' }}>
                        <Button onClick={() => onDismiss(item.objectID)}
                                classname="button-incline"
                        > Dismiss
                        </Button>
                    </span>
                    </div>;
                }
            )}
        </div>
    )
}

export function Button({onClick, className = "", children})
{
    return(
        <button
            onClick={onClick}
            className={className}
            type={"button"}
        >{children}
        </button>
    )
}