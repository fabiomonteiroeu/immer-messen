import type { Schema, Struct } from '@strapi/strapi';

export interface CaseProjectLogo extends Struct.ComponentSchema {
  collectionName: 'components_case_project_logos';
  info: {
    displayName: 'Project Logo';
    icon: 'image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface PageAboutContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_about_content_blocks';
  info: {
    displayName: 'About Content Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    highlight: Schema.Attribute.Component<'page.about-highlight', false>;
    rows: Schema.Attribute.Component<'page.about-row', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
  };
}

export interface PageAboutHighlight extends Struct.ComponentSchema {
  collectionName: 'components_page_about_highlights';
  info: {
    displayName: 'About Highlight';
  };
  attributes: {
    badgeLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }> &
      Schema.Attribute.DefaultTo<'INCEPTION PROGRAM'>;
    leftBody: Schema.Attribute.RichText & Schema.Attribute.Required;
    leftHeading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    media: Schema.Attribute.Media<'images'>;
    rightBody: Schema.Attribute.RichText & Schema.Attribute.Required;
    rightHeading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface PageAboutRow extends Struct.ComponentSchema {
  collectionName: 'components_page_about_rows';
  info: {
    displayName: 'About Row';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    media: Schema.Attribute.Media<'images'>;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface PageAccordionBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_accordion_blocks';
  info: {
    displayName: 'Accordion Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'page.accordion-item', true> &
      Schema.Attribute.Required;
  };
}

export interface PageAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_page_accordion_items';
  info: {
    displayName: 'Accordion Item';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface PageApplicationAreasBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_application_areas_blocks';
  info: {
    displayName: 'Application Areas Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    areas: Schema.Attribute.Relation<
      'oneToMany',
      'api::application-area.application-area'
    >;
    heading: Schema.Attribute.String;
  };
}

export interface PageCasesBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_cases_blocks';
  info: {
    displayName: 'Cases Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    cases: Schema.Attribute.Relation<'oneToMany', 'api::case-study.case-study'>;
    displayMode: Schema.Attribute.Enumeration<['manual', 'latest']> &
      Schema.Attribute.DefaultTo<'latest'>;
    heading: Schema.Attribute.String;
  };
}

export interface PageContactFormBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_contact_form_blocks';
  info: {
    displayName: 'Contact Form Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    submitLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface PageFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_page_feature_cards';
  info: {
    displayName: 'Feature Card';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 220;
      }>;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface PageFeatureGridBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_feature_grid_blocks';
  info: {
    displayName: 'Feature Grid Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    cards: Schema.Attribute.Component<'page.feature-card', true> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String;
  };
}

export interface PageHeroBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_hero_blocks';
  info: {
    displayName: 'Hero Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    backgroundVideo: Schema.Attribute.Media<'videos' | 'files'>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
    posterImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 320;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
  };
}

export interface PageLgpdContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_lgpd_content_blocks';
  info: {
    displayName: 'LGPD Content Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    sections: Schema.Attribute.Component<'page.lgpd-section', true> &
      Schema.Attribute.Required;
    summaryTitle: Schema.Attribute.String;
  };
}

export interface PageLgpdSection extends Struct.ComponentSchema {
  collectionName: 'components_page_lgpd_sections';
  info: {
    displayName: 'LGPD Section';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageMediaTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_media_text_blocks';
  info: {
    displayName: 'Media Text Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    ctaHref: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    features: Schema.Attribute.Component<'page.feature-card', true>;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    media: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    variant: Schema.Attribute.Enumeration<
      ['home-tech', 'tech-band', 'interface']
    >;
  };
}

export interface PageNewsCarouselBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_news_carousel_blocks';
  info: {
    displayName: 'News Carousel Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    articles: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-article.news-article'
    >;
    displayMode: Schema.Attribute.Enumeration<['manual', 'latest']> &
      Schema.Attribute.DefaultTo<'latest'>;
    heading: Schema.Attribute.String;
  };
}

export interface PagePageHeroBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_page_hero_blocks';
  info: {
    displayName: 'Page Hero Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    backgroundVideo: Schema.Attribute.Media<'videos' | 'files'>;
    posterImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 220;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
  };
}

export interface PagePartnersBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_partners_blocks';
  info: {
    displayName: 'Partners Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    heading: Schema.Attribute.String;
    partners: Schema.Attribute.Relation<'oneToMany', 'api::partner.partner'>;
  };
}

export interface PageRawEmbedBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_raw_embed_blocks';
  info: {
    displayName: 'Raw Embed Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    embedCode: Schema.Attribute.Text & Schema.Attribute.Required;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_page_text_blocks';
  info: {
    displayName: 'Text Block';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'brand']> &
      Schema.Attribute.DefaultTo<'light'>;
    width: Schema.Attribute.Enumeration<['narrow', 'default', 'wide']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface SharedContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_details';
  info: {
    displayName: 'Contact Details';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'Link Item';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedMenuColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_menu_columns';
  info: {
    displayName: 'Menu Column';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Default and page-level SEO metadata';
    displayName: 'SEO';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    canonical: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
  };
  pluginOptions: {
    i18n: {
      localized: false;
    };
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'case.project-logo': CaseProjectLogo;
      'page.about-content-block': PageAboutContentBlock;
      'page.about-highlight': PageAboutHighlight;
      'page.about-row': PageAboutRow;
      'page.accordion-block': PageAccordionBlock;
      'page.accordion-item': PageAccordionItem;
      'page.application-areas-block': PageApplicationAreasBlock;
      'page.cases-block': PageCasesBlock;
      'page.contact-form-block': PageContactFormBlock;
      'page.feature-card': PageFeatureCard;
      'page.feature-grid-block': PageFeatureGridBlock;
      'page.hero-block': PageHeroBlock;
      'page.lgpd-content-block': PageLgpdContentBlock;
      'page.lgpd-section': PageLgpdSection;
      'page.media-text-block': PageMediaTextBlock;
      'page.news-carousel-block': PageNewsCarouselBlock;
      'page.page-hero-block': PagePageHeroBlock;
      'page.partners-block': PagePartnersBlock;
      'page.raw-embed-block': PageRawEmbedBlock;
      'page.text-block': PageTextBlock;
      'shared.contact-details': SharedContactDetails;
      'shared.link-item': SharedLinkItem;
      'shared.menu-column': SharedMenuColumn;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
