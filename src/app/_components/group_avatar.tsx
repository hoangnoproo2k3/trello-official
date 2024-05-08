/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup } from '@nextui-org/react'
import React from 'react'

const Group_avatar = ({ size }: any) => {
    return (
        <AvatarGroup isBordered max={3} total={10} size='md'>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
    )
}

export default Group_avatar
