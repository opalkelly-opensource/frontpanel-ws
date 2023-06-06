/**
 * The async operations.
 */

import { FrontPanelError } from './error';

export class AsyncOperation<T> {
    public readonly promise: Promise<T>;
    private resolveCb: (value: T) => void;
    private rejectCb: (reason?: FrontPanelError) => void;

    constructor(operation: () => void) {
        this.resolveCb = () => {
            /* Nothing to do by default. */
        };
        this.rejectCb = () => {
            /* Nothing to do by default. */
        };
        this.promise = new Promise<T>(
            (
                resolve: (value: T) => void,
                reject: (reason?: FrontPanelError) => void
            ) => {
                this.resolveCb = resolve;
                this.rejectCb = reject;
                operation();
            }
        );
    }
    public resolve(value: T): void {
        this.resolveCb(value);
    }
    public reject(reason?: FrontPanelError): void {
        this.rejectCb(reason);
    }
}
