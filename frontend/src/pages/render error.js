 {/* Render error container only when there are form errors */}
            {Object.keys(formError).length > 0 && (
                <div id="error-container">
                    {/* Render error messages conditionally */}
                    {formError.password && (
                        <span style={{ color: 'red', fontSize: '15px' }}>{formError.password}</span>
                    )}
                    {formError.email && (
                        <span style={{ color: 'red', fontSize: '15px' }}>{formError.email}</span>
                    )}
                    {formError.phone && (
                        <span style={{ color: 'red', fontSize: '15px' }}>{formError.phone}</span>
                    )}
                </div>
            )}

            //same div differente error