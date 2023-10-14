// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useRef, useState} from 'react';
import {Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {injectIntl, type IntlShape} from 'react-intl';

import TeamSettings from 'components/team_settings';
import ModalHeader from 'components/widgets/modals/generic/modal_header';

import * as Utils from 'utils/utils';

const SettingsSidebar = React.lazy(() => import('components/settings_sidebar'));

type Props = {
    onExited: () => void;
    isCloud?: boolean;
    intl: IntlShape;
}

export type State = {
    activeTab: string;
    activeSection: string;
    show: boolean;
}

const TeamSettingsModal = (props: Props) => {
    const modalBodyRef = useRef<Modal>(null);
    const [activeTab, setActiveTab] = useState<string>('general');
    const [activeSection, setActiveSection] = useState<string>('');
    const [show, setShow] = useState<boolean>(true);

    const updateTab = (tab: string) => {
        setActiveTab(tab);
        setActiveSection('');
    };

    const updateSection = (section: string) => setActiveSection(section);

    const collapseModal = () => {
        const el = ReactDOM.findDOMNode(modalBodyRef?.current) as HTMLDivElement;
        const modalDialog = el.closest('.modal-dialog');
        modalDialog?.classList.remove('display--content');
        setActiveTab('');
        setActiveSection('');
    };

    const handleHide = () => setShow(false);

    // called after the dialog is fully hidden and faded out
    const handleHidden = () => {
        setActiveTab('general');
        setActiveSection('');
        props.onExited();
    };

    const tabs = [];
    tabs.push({name: 'general', uiName: Utils.localizeMessage('team_settings_modal.generalTab', 'General'), icon: 'icon fa fa-cog', iconTitle: Utils.localizeMessage('generic_icons.settings', 'Settings Icon')});
    tabs.push({name: 'info', uiName: Utils.localizeMessage('team_settings_modal.info', 'Info'), icon: 'icon fa fa-cog', iconTitle: Utils.localizeMessage('generic_icons.settings', 'Indo Icon')});

    return (
        <Modal
            dialogClassName='a11y__modal settings-modal settings-modal--action'
            show={show}
            onHide={handleHide}
            onExited={handleHidden}
            role='dialog'
            aria-labelledby='teamSettingsModalLabel'
            id='teamSettingsModal'
        >
            <ModalHeader
                id='teamSettingsModalLabel'
                title={props.intl.formatMessage({
                    id: 'team_settings_modal.title',
                    defaultMessage: 'Team Settings',
                })}
                handleClose={handleHide}
            />
            <Modal.Body ref={modalBodyRef}>
                <div className='settings-table'>
                    <div className='settings-links'>
                        <React.Suspense fallback={null}>
                            <SettingsSidebar
                                tabs={tabs}
                                activeTab={activeTab}
                                updateTab={updateTab}
                            />
                        </React.Suspense>
                    </div>
                    <div className='settings-content minimize-settings'>
                        <TeamSettings
                            activeTab={activeTab}
                            activeSection={activeSection}
                            updateSection={updateSection}
                            closeModal={handleHide}
                            collapseModal={collapseModal}
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default injectIntl(TeamSettingsModal);
