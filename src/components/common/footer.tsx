import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <div className='text-center py-[12px]'>
            {t('copyright')}
        </div>
    );
}