// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import type {Team} from '@mattermost/types/teams';

// todo: move this to teams tab or generalize to use in other settings modal
import GeneralTab from 'components/team_general_tab';

type Props = {
    activeTab: string;

    // todo: check where it is passed and remove
    // activeSection: string;
    // updateSection: (section: string) => void;
    closeModal: () => void;
    collapseModal: () => void;
    team?: Team;
};

const TeamSettings = ({
    activeTab = '',

    // activeSection = '',
    // updateSection,
    closeModal,
    collapseModal,
    team,
}: Props): JSX.Element | null => {
    if (!team) {
        return null;
    }

    let result;
    switch (activeTab) {
    case 'general':
        result = (
            <div>
                <GeneralTab
                    team={team}
                    closeModal={closeModal}
                    collapseModal={collapseModal}
                />
            </div>
        );
        break;
    case 'info':
        result = (
            <div>{'info'}</div>
        );
        break;
    default:
        result = (
            <div/>
        );
        break;
    }

    return result;
};

export default TeamSettings;
