'use strict';

$(window).on('load',function(){
    $(window).on('error', function(evt) {
        log('Run-time error: ' + JSON.stringify(evt));
        return false;
    });

    function log(text) {
        $('#logWindow').
            append(document.createTextNode(text)).
            append(document.createElement('br'));
    }

    $('#modalConnect').modal('show');

    let fp;

    // Execute func and in case of an error log it and update the GUI.
    async function callAndCheckErrors(func) {
        try {
            await func();
        } catch (e) {
            // Don't log disconnection errors if we closed the connection ourselves.
            if (
                !(e instanceof frontpanelWs.FrontPanelError &&
                e.code === frontpanelWs.ErrorCode.DisconnectByClient)
            ) {
                log(e);
            }

            // Disconnect on an error.
            if (fp !== null && fp.isConnected) {
                await fp.disconnect();
            }

            fp = null;

            // Set the GUI to the disconnected state.
            setConnected(null);
        }
    }

    async function repeat(func) {
        await callAndCheckErrors(async () => {
            for (;;) {
                await new Promise(resolve => setTimeout(resolve, 100));

                if (fp === null) {
                    return;
                }

                await func();
            }
        });
    }

    function setConnected(server) {
        const connected = server !== null;
        $('#connectionStatus').
            text(connected ? 'Connected to ' + server : 'Disconnected');
        $('#buttonStatus').
            text(connected ? 'Disconnect' : 'Connect');
        if (!connected) {
            $("#devicesList").empty();
            $('#modalConnect').modal('show');
        }
    }

    $('#buttonConnect').click(async function() {
        $('#modalConnect').modal('hide');

        const server =  $('#inputServer').val();

        fp = new frontpanelWs.FrontPanel({server});

        callAndCheckErrors(async function() {
            await fp.connect();
            log('Opened connection to "' + server + '"');

            setConnected(server);

            const devices = await fp.login(
                $('#inputUsername').val(),
                $('#inputPassword').val()
            );

            if (devices.length == 0) {
                log('No devices available');
            } else {
                // Update the devices list.
                let devicesHTML = "";
                $.each(devices, function (i, ob) {
                    devicesHTML += '<option>' + ob + '</option>';
                });
                $("#devicesList").empty().append(devicesHTML);

                const device = devices[0];
                log('Opening the first device "' + device + '"...');
                await fp.openDevice(device);

                log('Getting the device info...');
                const info = await fp.getDeviceInfo();
                log('Device info: ' + JSON.stringify(info));

                log('Closing the device...');
                await fp.closeDevice();
                log('Done');
            }

            repeat(async function() {
                const result = await fp.waitForServer();
                if (result.notification) {
                    const device = result.data;
                    switch (result.notification) {
                        case frontpanelWs.Notification.DeviceConnected:
                            $('#devicesList').append('<option>' + device + '</option>');
                            log('Device connected: "' + device + '"');
                            break;
                        case frontpanelWs.Notification.DeviceDisconnected:
                            $('#devicesList option').each(function() {
                                if ($(this).text() === device) {
                                    $(this).remove();
                                }
                            });
                            log('Device disconnected: "' + device + '"');
                            break;
                    }
                } else {
                    log('Reply from the server: "' + result.data + '"');
                }
            });
        });
    });

    $('#buttonStatus').click(async function() {
        $('#buttonStatus').prop('disabled', true);

        if (fp !== null) {
            // Connected.
            try {
                await fp.disconnect();
                log('Closed connection');
            }
            catch (e) {
                log(e);
            }
            finally {
                fp = null;
                setConnected(null);
            }
        } else {
            $('#modalConnect').modal('show');
        }

        $('#buttonStatus').prop('disabled', false);
        return false;
    });
});
