const exec = require('child_process').exec;
class ProxySet {
    constructor() {
    }

    getState(url) {
        return this._getCurrentService().then((name) => {
            let cmd = `networksetup -getautoproxyurl "${name}"`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    resolve(raw.length === 2
                        && raw[1] === 'Enabled: Yes'
                        && raw[0] === `URL: ${url}`);
                });
            });
        });
    }

    _getCurrentDeviceName() {
        let cmd = 'netstat -rn | grep UG | awk \'{print $6}\'';
        return new Promise((resolve, reject) => {
            exec(cmd, (err, stdout) => {
                if (err) {
                    reject(err);
                    return;
                }
                let raw = stdout.toString().trim().split('\n');
                if (raw.length === 1 && raw[0] !== '') {
                    resolve(raw[0]);
                } else {
                    reject(new Error('No active network interface found.'));
                }
            });
        });
    }

    _getCurrentService() {
        return this._getCurrentDeviceName().then((name) => {
            let cmd = `networksetup -listnetworkserviceorder | grep '${name}'`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    if (raw.length === 0 || raw[0] === '') {
                        reject(new Error('No active network interface found.'));
                    } else {
                        var r = new RegExp(`\\(Hardware Port: (.+), Device: ${name}\\)`, 'g');
                        var m = r.exec(raw[0]);
                        if (m.length > 1) {
                            resolve(m[1]);
                        } else {
                            reject(new Error('No active network interface found.'));
                        }
                    }
                });
            });
        });
    }

    setProxy(url) {
        return this._getCurrentService().then((name) => {
            let cmd = `networksetup -setautoproxyurl "${name}" ${url}`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    if (raw.length === 1 && raw[0] === '') {
                        resolve(true);
                    } else {
                        reject(new Error('Open Proxy Failed!'));
                    }
                });
            });
        });
    }

    getByPass() {
        return this._getCurrentService().then((name) => {
            let cmd = `networksetup -getproxybypassdomains "${name}"`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    if (raw.length == 0 || raw[0].indexOf('There aren\'t any bypass domains set on') > -1) {
                        resolve('');
                    } else {
                        resolve(raw.join(','));
                    }
                });
            });
        });
    }

    modifyByPass(byPass) {
        byPass = byPass.replace(',',' ').replace(';',' ');
        return this._getCurrentService().then((name) => {
            let cmd = `networksetup -setproxybypassdomains "${name}" ${byPass}`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    if (raw.length === 1 && raw[0] === '') {
                        resolve(true);
                    } else {
                        reject(new Error('Set Proxy ByPass Failed!'));
                    }
                });
            });
        });
    }

    disableProxy() {
        return this._getCurrentService().then((name) => {
            let cmd = `networksetup -setautoproxystate "${name}" off`;
            return new Promise((resolve, reject) => {
                exec(cmd, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let raw = stdout.toString().trim().split('\n');
                    if (raw.length === 1 && raw[0] === '') {
                        resolve(true);
                    } else {
                        reject(new Error('Close Proxy Failed!'));
                    }
                });
            });
        });
    }
}

module.exports = new ProxySet();