export const getEmailTemplate = (template: string, variables: { [key: string]: string }): string => {
    return Object.entries(variables).reduce(
        (content, [key, value]) => content.replace(new RegExp(`{{${key}}}`, 'g'), value),
        template,
    );
};
